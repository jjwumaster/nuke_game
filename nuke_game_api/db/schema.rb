# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180124191113) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "grid_squares", force: :cascade do |t|
    t.integer "x_coord"
    t.integer "y_coord"
    t.float "pop"
    t.boolean "shot"
    t.boolean "land"
    t.string "country"
    t.boolean "has_player", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "density"
    t.boolean "targeted"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.integer "x_coord"
    t.integer "y_coord"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.integer "player_number"
    t.string "flag"
  end

  create_table "weapons", force: :cascade do |t|
    t.bigint "player_id"
    t.integer "blast_radius"
    t.string "name"
    t.integer "shots"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "success_rate"
    t.string "description"
    t.index ["player_id"], name: "index_weapons_on_player_id"
  end

  add_foreign_key "weapons", "players"
end
