class AddLedgerComment < ActiveRecord::Migration
  def self.up
    add_column :ledgers, :comment, :string, { :limit => 64 }
  end

  def self.down
    drop_column :ledgers, :comment
  end
end
