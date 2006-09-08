require File.dirname(__FILE__) + '/../test_helper'

class LedgerTest < Test::Unit::TestCase
  fixtures :ledgers

  # Replace this with your real tests.
  def test_truth
    assert_kind_of Ledger, ledgers(:first)
  end
end
