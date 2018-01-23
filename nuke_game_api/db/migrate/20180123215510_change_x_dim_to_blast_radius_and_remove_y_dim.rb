class ChangeXDimToBlastRadiusAndRemoveYDim < ActiveRecord::Migration[5.1]
  def change
    remove_column :weapons, :y_dim
    rename_column :weapons, :x_dim, :blast_radius
  end
end
