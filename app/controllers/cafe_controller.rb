class CafeController < ApplicationController

  append_before_filter :verify_identity
  append_before_filter :ensure_post, :only => [ 'make_contribution',
    'make_purchase', 'milk_purchased' ]
  append_before_filter :add_refresh_link, :only => [ 'index' ]
  append_before_filter :find_fund, :only => [ 'index', 'make_contribution',
    'make_purchase' ]
  append_before_filter :find_next_milk_purchaser, :only => [ 'index' ]

  ##
  # The main coffee page.
  #
  def index
    unless @fund.nil?
      add_related_function 'Make Contribution',
        "dojo.widget.byId('contributionDialog').show()"
      add_related_function 'Make Purchase',
        "dojo.widget.byId('purchaseDialog').show()"
      add_related_function 'Milk Purchased',
        "dojo.byId('milk_form').submit()" unless @fund.contribution == 0.0
    end
  end

  ##
  # The method to confirm you bought milk.
  #
  def milk_purchased
    l = Ledger.new
    l.fund_id = session[:barista][:fund_id]
    l.barista_id = session[:barista][:id]
    l.comment = 'MILK'
    l.post_date = Date.today
    begin
      l.save!
      session[:barista].update_attribute 'milk_last_bought_at', Time.now
      flash[:info] = 'You just purchased milk!'
    rescue => exception
      flash[:error] = 'There was a problem: #{exception.to_s}'
    end
    goto_index
  end

  ##
  # The method to make a contribution to the fund.
  #
  def make_contribution
    # this is one of the more complicated procedures in the app
    new_contribution = Ledger.new
    # set the contribution amount from the fund
    if @fund.contribution.nil? or @fund.contribution == 0
      new_contribution.credit_amount = params[:contribution].to_f rescue 0.0
    else
      new_contribution.credit_amount = @fund.contribution
    end
    # update the fund balance
    @fund.make_contribution new_contribution.credit_amount
    new_contribution.barista_id = params[:contribution][:barista_id]
    new_contribution.fund_id = session[:barista][:fund_id]
    new_contribution.comment = 'CONTRIBUTION'
    new_contribution.post_date = Date.today

    begin
      new_contribution.save!
      quantity = params[:contribution][:quantity].to_i
      if quantity > 1
        (2..quantity).each do |q|
          c = Ledger.new
          c.attributes = new_contribution.attributes
          c.post_date = new_contribution.post_date >> 1
          c.save!
        end
      end
      session[:barista].save!
      @fund.save!
      flash[:info] =
        "Successfully contributed to the fund <strong>#{@fund.name}</strong>!"
    rescue => exception
      flash[:error] = "Failed to properly work: #{exception.to_s}"
    end

    goto_index
  end

  ##
  # The method for making a purchase out of general funds.
  #
  def make_purchase
    new_purchase = Ledger.new
    new_purchase.debit_amount = params[:amount]
    new_purchase.comment = params[:comment]
    new_purchase.barista_id = session[:barista][:id]
    new_purchase.fund_id = session[:barista][:fund_id]
    new_purchase.post_date = Date.today
    @fund.make_purchase new_purchase.debit_amount

    begin
      new_purchase.save!
      session[:barista].save!
      @fund.save!
      flash[:info] = "Successfully purchased ... supplies!"
    rescue => exception
      flash[:error] = "Failed to work properly: #{exception.to_s}"
    end

    goto_index
  end

  private

  ##
  # A simple helper to find the next person to buy milk.
  #
  def find_next_milk_purchaser
    return if @fund.nil?
    @next_milk_purchaser = Barista.find :first,
      :order => "milk_last_bought_at ASC",
      :conditions => [ 'fund_id = ?', @fund.id ]
  end

end
