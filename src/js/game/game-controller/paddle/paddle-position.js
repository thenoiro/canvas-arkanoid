export default class PaddlePosition {
  /**
   * Paddle position options
   * @param {object} options
   * @param {object} options.container
   * @param {number} options.container.width
   * @param {number} options.container.height
   * @param {object} options.paddle
   * @param {number} options.paddle.width
   * @param {number} options.paddle.height
   * @param {object} [options.paddle.margin]
   * @param {number} [options.paddle.margin.bottom]
   * @param {number} [options.paddle.margin.top]
   * @param {number} [options.paddle.margin.left]
   * @param {number} [options.paddle.margin.right]
   */
  constructor(options) {
    const { paddle, container } = options;
    const { margin = {} } = paddle;

    this.width = paddle.width;
    this.height = paddle.height;
    this.halfWidth = paddle.width / 2;
    this.halfHeight = paddle.height / 2;
    this.margin = {
      top: margin.top || 0,
      bottom: margin.bottom || 0,
      left: margin.left || 0,
      right: margin.right || 0,
    };
    this.x = (container.width / 2) - this.halfWidth + this.margin.left - this.margin.right;
    this.y = container.height - this.height + this.margin.top - this.margin.bottom;
  }
}
