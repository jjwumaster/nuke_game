class AddTargetedToGridSquares < ActiveRecord::Migration[5.1]
  def change
    add_column :grid_squares, :targeted, :boolean
  end
end
