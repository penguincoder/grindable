require File.dirname(__FILE__) + '/../test_helper'

class BaristaTest < Test::Unit::TestCase
  fixtures :baristas

  # Replace this with your real tests.
  def test_truth
    assert_kind_of Barista, baristas(:first)
  end
end
