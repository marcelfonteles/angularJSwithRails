module Api
	class EventsController < ApplicationController
    # respond_to :json

    def index
      # respond_with Event.all
      render json: { status: 200, data: Event.all }
    end

    def show
      @event = Event.find(params[:id])
      render json: {status: 200, data: @event}
    end

    def create
      @event = Event.new(events_params)
      if @event.save
        render json: {status: 200, data: @event}
      else
        render json: {status: 401}
      end
    end

    def destroy
      @event = Event.find(params[:id])
      @event.destroy
    end

    private

    def events_params
      params.require(:event).permit(:name, :event_date, :description, :place)
    end
	end
end
