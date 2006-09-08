class BaseSchema < ActiveRecord::Migration
  def self.up
    create_table :funds do |t|
      t.column :name, :string, { :limit => 64 }
      t.column :created_at, :datetime
      t.column :balance, :float
      t.column :contribution, :float
    end
    
    create_table :baristas do |t|
      t.column :name, :string, { :limit => 64, :null => false }
      t.column :milk_last_bought_at, :datetime
    end
    
    create_table :ledgers do |t|
      t.column :barista_id, :integer, { :null => false }
      t.column :created_at, :datetime
      t.column :credit_amount, :float
      t.column :debit_amount, :float
    end
    
    add_index :ledgers, :barista_id
  end

  def self.down
    raise 'IrreversibleMigration: You cannot remove the base schema!'
  end
end
