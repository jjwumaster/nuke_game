require_relative './map_images.rb'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Weapon.destroy_all
Player.destroy_all
GridSquare.destroy_all

puts Dir.pwd

kim_jong_un = Player.create({
  player_number: 1,
  name: "Kim Jong Un",
  description: "Supreme Glorious Commander-God of Best Korea"
  })

donald_trump = Player.create({
  player_number: 2,
  name: "Donald J. Trump",
  description: "Commander in Chief of the United States Armed Forces."
  })

trident_ii = Weapon.create({
    name: "Trident II",
    description: "Submarine-based thermonuclear Weapon. Mark V MIRV carries twelve 475 kiloton warheads.",
    shots: 5,
    x_dim: 4,
    y_dim: 4,
    success_rate: 1.00,
    player: donald_trump
  })

  b83 = Weapon.create({
      name: "B83 Thermonuclear Bomb",
      description: "Variable-yield unguided bomb deployed by the B2 Spirit Bomber. Maximum yield of 1.2 megatons.",
      shots: 10,
      x_dim: 3,
      y_dim: 3,
      success_rate: 1.00,
      player: donald_trump
    })

  b81 = Weapon.create({
      name: "B81 Thermonuclear Bomb",
      description: "Low-to-intermediate-yield tactical nuclear weapon. Maximum yield of 340 kilotons.",
      shots: 20,
      x_dim: 2,
      y_dim: 2,
      success_rate: 1.00,
      player: donald_trump
    })

hwasong_15 = Weapon.create({
    name: "Hwasong 15",
    description: "Intercontinental ballistic missile. Capable of reaching all of the United States mainland.",
    shots: 5,
    x_dim: 3,
    y_dim: 3,
    success_rate: 0.20,
    player: kim_jong_un
  })

hwasong_10 = Weapon.create({
    name: "Hwasong 10",
    description: "Mobile intermediate-range ballistic missile.",
    shots: 10,
    x_dim: 2,
    y_dim: 2,
    success_rate: 0.50,
    player: kim_jong_un
  })

  hwasong_7 = Weapon.create({
      name: "Hwasong 7",
      description: "Single-stage, mobile liquid propellant medium-range ballistic missile.",
      shots: 100,
      x_dim: 1,
      y_dim: 1,
      success_rate: 0.90,
      player: kim_jong_un
    })

density_ref = {
  h: "high",
  m: "medium",
  l: "low",
  z: "zero"
  }

def populate_grid_from_map(land_map)

  country_ref = {
    "n" => ["North Korea", "zero"],
    "s" => ["South Korea", "zero"],
    "h" => ["South Korea", "high"],
    "m" => ["South Korea", "medium"],
    "l" => ["South Korea", "low"],
    "c" => ["China", "zero"],
    "r" => ["Russia", "zero"],
    "j" => ["Japan", "zero"],
    "." => ["Water", "zero"]
    }

  land_map.each_with_index do |row, y|
    row_string = row.split("") # this is a row that's a string
    row_string.each_with_index do |letter, x|
      country = country_ref[letter][0]
      pop = country_ref[letter][1]

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


### POPULATING A SQUARE MAP SPLIT IN TWO:

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
