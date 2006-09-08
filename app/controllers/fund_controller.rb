class FundController < ApplicationController

  in_place_edit_for :fund, :contribution
  
  append_before_filter :ensure_post, :only => [ 'add', 'delete', 'use' ]
  append_before_filter :add_refresh_link, :only => [ 'index' ]

  def index
    @funds = Fund.find :all, :include => [ 'baristas' ]
    add_related_function 'Add Fund', "dojo.widget.byId('fundDialog').show()"
  end

  def add
    allowed_parameters = [ 'name', 'contribution' ]
    params.delete_if { |key, value| !allowed_parameters.include? key }

    begin
      fund = Fund.new params
      fund.contribution = 0.0 if params[:contribution].nil? or
        params[:contribution].empty?
      fund.balance = 0.0
      fund.save!
      flash[:info] = 'Word, success!'
    rescue => exception
      flash[:error] = 'There was a problem saving the fund: ' +
        exception.to_s
    end

    redirect_to :action => 'index'
  end
  
  def delete
    fund = Fund.find params[:id].to_i
    if fund.nil?
      flash[:error] = 'That fund does not exist!'
    else
      old_name = fund[:name]
      begin
        fund.destroy
        flash[:info] = "The fund #{old_name} has been deleted."
      rescue => exception
        flash[:error] = "Encountered a problem while removing the fund: " +
          exception.to_s
      end
    end

    goto_index
  end

  def use
    fund = Fund.find params[:id].to_i
    if fund.nil?
      flash[:error] = 'That fund does not exist!'
    else
      session[:barista][:fund_id] = params[:id]
      begin
        session[:barista].save!
        session[:barista].reload
      rescue => exception
        flash[:error] = "Failed while updating the user: #{exception.to_s}"
      else
        flash[:info] = 'Successfully updated the user fund.'
      end
    end

    goto_index
  end
end
