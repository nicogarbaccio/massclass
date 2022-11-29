class AddPinnedToAnnouncements < ActiveRecord::Migration[7.0]
  def change
    add_column :announcements, :pinned, :boolean, default: false
  end
end
