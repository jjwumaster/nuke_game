# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

GridSquare.destroy_all
Player.destroy_all
Weapon.destroy_all

def populate_grid(x, y)
  (1..x).each do |x_coord|
    (1..y).each do |y_coord|
      GridSquare.create({
        x_coord: x_coord,
        y_coord: y_coord,
        pop: 0,
        shot: false,
        land: true,
        country: nil
        })
    end
  end
end

populate_grid(2, 2)
