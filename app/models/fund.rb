class Fund < ActiveRecord::Base

  validates_numericality_of :balance, :contribution
  validates_uniqueness_of :name
  has_many :baristas
  has_many :ledgers, :dependent => true

  def make_contribution(amount)
    self[:balance] += amount
  end

  def make_purchase(amount)
    self[:balance] -= amount
  end

  def self.for_select
    self.find(:all, :select => 'id, name').collect { |f| [ f.name, f.id.to_s ] }
  end
  
  def before_destroy
    raise "Fund still has baristas!" unless self.baristas.empty?
  end
end
