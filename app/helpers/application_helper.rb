# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper

  def escape_preserving_linefeeds(text)
    h(text).gsub(/\n/, '<br/>')
  end

  def escape_preserving_linefeeds_and_html(text)
    text.gsub(/\n/, '<br/>')
  end

  def display_amount(amount)
    return '' if amount.nil?
    sprintf("$%0.2f", amount)
  end
  
  def display_date(date)
    return '' if date.nil?
    "#{date.month}-#{date.day}-#{date.year}"
  end
end
