class CreateLoans < ActiveRecord::Migration[5.2]
  def change
    create_table :loans do |t|
      t.string :store
      t.float :amount
      t.integer :portions
      t.date :date
      t.references :customer, foreign_key: true

      t.timestamps
    end
  end
end
