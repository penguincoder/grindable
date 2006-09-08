require File.dirname(__FILE__) + '/../test_helper'
require 'barista_controller'

# Re-raise errors caught by the controller.
class BaristaController; def rescue_action(e) raise e end; end

class BaristaControllerTest < Test::Unit::TestCase
  def setup
    @controller = BaristaController.new
    @request    = ActionController::TestRequest.new
    @response   = ActionController::TestResponse.new
  end

  # Replace this with your real tests.
  def test_truth
    assert true
  end
end
