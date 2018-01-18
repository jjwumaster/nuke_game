class CreateWeapons < ActiveRecord::Migration[5.1]
  def change
    create_table :weapons do |t|
      t.belongs_to :player, foreign_key: true
      t.integer :x_dim
      t.integer :y_dim
      t.string :name
      t.integer :shots_remaining

      t.timestamps
    end
  end
end
