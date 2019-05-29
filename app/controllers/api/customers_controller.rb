module Api
  class CustomersController < ApplicationController
    
    def index
      @customers = Customer.all
      render json: {status: 200, data: @customers}
    end

    def show
      @customer = Customer.find(params[:id])
      @loans = Loan.all.where(customer_id: params[:id])
      render json: {status: 200, data: @customer, data2: @loans}
    end

    def create
      @customer = Customer.new(customers_params)
      if @customer.save
        render json: {status: 200, data: @customer }
      else
        render json: {status: 400 }
      end
    end

    def destroy
      @customer = Customer.find(params[:id])
      if @customer.destroy 
        render json: { status: 200, data: @customer }
      else 
        render json: { status: 400 }
      end
    end

    private

    def customers_params
      params.require(:customer).permit(:name, :address, :cpf, :phone)
    end
  end
end