class AddLedgerFundRelationship < ActiveRecord::Migration
  def self.up
    add_column :ledgers, :fund_id, :integer
    add_index :ledgers, :fund_id
  end

  def self.down
    drop_column :ledgers, :fund_id
    drop_index :ledgers, :fund_id
  end
end
