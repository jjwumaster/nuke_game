class ChangePopToFloat < ActiveRecord::Migration[5.1]
  def change
    change_column :grid_squares, :pop, :float
  end
end
