class AddFindToBarista < ActiveRecord::Migration
  def self.up
    add_column :baristas, :fund_id, :integer
    add_index :baristas, :fund_id
  end

  def self.down
    drop_column :baristas, :fund_id
  end
end
