class LedgerPostDate < ActiveRecord::Migration
  def self.up
    add_column :ledgers, :post_date, :date
  end

  def self.down
    remove_column :ledgers, :post_date
  end
end
