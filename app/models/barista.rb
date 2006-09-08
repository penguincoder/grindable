class Barista < ActiveRecord::Base
  has_many :ledgers, :order => "created_at ASC"
  
  belongs_to :fund
  validates_presence_of :fund
  
  validates_length_of :name, :within => 6..64
  
  def self.for_select(fund_id = nil)
    if fund_id.nil?
      arr = self.find :all, :order => 'name ASC', :select => 'id, name'
    else
      arr = self.find :all, :order => 'name ASC', :select => 'id, name',
        :conditions => [ 'fund_id = ?', fund_id ]
    end

    arr.collect do |b|
      [ b.name, b.id.to_s ]
    end
  end
  
  def paid_this_month?
    this_month = Date.new(Date.today.year, Date.today.month, 1)
    next_month = (this_month >> 1) - 1
    variables = { :this_month => this_month, :next_month => next_month,
      :fund_id => self.fund_id }
    query_str = []
    query_str << 'post_date >= :this_month'
    query_str << 'post_date <= :next_month'
    query_str << 'credit_amount IS NOT NULL'
    query_str << 'fund_id = :fund_id'
    
    return false if (self.ledgers.find :first,
      :conditions => [ query_str.join(' AND '), variables ]).nil?
    true
  end
end