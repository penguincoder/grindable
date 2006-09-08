class Ledger < ActiveRecord::Base
  belongs_to :barista
  belongs_to :fund

  validates_numericality_of :debit_amount, :credit_amount, :allow_nil => true
end
