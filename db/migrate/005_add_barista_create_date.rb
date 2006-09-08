class AddBaristaCreateDate < ActiveRecord::Migration
  def self.up
    add_column :baristas, :created_on, :date
  end

  def self.down
    drop_column :baristas, :created_on
  end
end
