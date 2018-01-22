require_relative './map_images.rb'

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

puts Dir.pwd

# need high / medium / low / zero
w = "water"

h = "high"
m = "medium"
l = "low"
z = "zero"

def populate_grid_from_map(land_map)

  country_ref = {
  "n" => "North Korea",
  "s" => "South Korea",
  "c" => "China",
  "r" => "Russia",
  "j" => "Japan",
  "." => "Water"
  }

  land_map.each_with_index do |row, y|
    row_string = row.split("") # this is a row that's a string
    row_string.each_with_index do |letter, x|
      country = country_ref[letter]
      land = letter == "." ? false : true
      GridSquare.create({
        x_coord: x + 1,
        y_coord: y + 1,
        pop: 0,
        shot: false,
        land: land,
        country: country,
        density: "zero"
        })
    end
  end
end

populate_grid_from_map(LAND_MAP)

# def populate_grid(x, y)
#   (1..x).each do |x_coord|
#     (1..25).each do |y_coord|
#       GridSquare.create({
#         x_coord: x_coord,
#         y_coord: y_coord,
#         pop: 0,
#         shot: false,
#         land: false,
#         country: "China"
#         })
#     end
#
#     (26..50).each do |y_coord|
#       GridSquare.create({
#         x_coord: x_coord,
#         y_coord: y_coord,
#         pop: 0,
#         shot: false,
#         land: true,
#         country: "North Korea"
#         })
#     end
#   end
# end

# populate_grid(50, 50)
