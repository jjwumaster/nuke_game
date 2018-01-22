class RenameShotsRemainingOnWeapons < ActiveRecord::Migration[5.1]
  def change
    rename_column :weapons, :shots_remaining, :shots
  end
end
