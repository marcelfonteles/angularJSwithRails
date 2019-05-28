class AddColunsToCustomer < ActiveRecord::Migration[5.2]
  def change
    add_column :customers, :name, :string
    add_column :customers, :address, :string
    add_column :customers, :cpf, :string
    add_column :customers, :phone, :string
  end
end
