class ActivityController < ApplicationController

  append_before_filter :verify_identity
  append_before_filter :add_refresh_link, :only => [ 'index' ]
  append_before_filter :find_fund, :only => [ 'index' ]

  ##
  # This method will display a list of the purchases for the fund, starting
  # with the oldest. Also handily paginated by default. Lookit, four lines!
  #
  def index
    unless @fund.nil?
      @purchase_pages, @purchases = paginate :ledger, :order =>
          "ledgers.post_date DESC, ledgers.created_at DESC",
          :conditions => [ 'ledgers.fund_id = ?', @fund.id ],
          :joins => "LEFT JOIN baristas ON ledgers.barista_id = baristas.id"
    end
  end
end