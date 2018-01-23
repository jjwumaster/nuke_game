class WeaponsController < ApplicationController

  def index
    @weapons = Weapon.all
    render json: @weapons, status: 200
  end

  def update
    @weapon = Weapon.find(params[:id])
    @weapon.update(weapon_params)
    render json: @weapon, status: 200
  end

  private

  def weapon_params
    params.require(:weapon).permit(:shots)
  end

end
