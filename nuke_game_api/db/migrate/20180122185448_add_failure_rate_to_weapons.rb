class AddFailureRateToWeapons < ActiveRecord::Migration[5.1]
  def change
    add_column :weapons, :failure_rate, :float
  end
end
