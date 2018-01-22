class RenameFailureRate < ActiveRecord::Migration[5.1]
  def change
    rename_column :weapons, :failure_rate, :success_rate
  end
end
