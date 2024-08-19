/**
 * D3SVG Class for creating and managing an SVG element using D3.js.
 * 
 * @class
 * @property {Object} margin - Margin around the SVG.
 * @property {number} initialWidth - Initial width of the SVG.
 * @property {number} initialHeight - Initial height of the SVG.
 * @property {number} aspectRatio - Aspect ratio of the SVG, calculated as initialWidth / initialHeight.
 * @property {Object} svg - The SVG element.
 * @property {number} width - Width of the inner drawing area.
 * @property {number} height - Height of the inner drawing area.
 * @property {Object} g - The main SVG group element.
 */
class SVG {
  /**
   * Creates a D3SVG instance.
   * 
   * @constructor
   * @param {Object} [options] - Configuration options for the D3SVG instance.
   * @param {Object} [options.margin={ top: 20, right: 20, bottom: 50, left: 50 }] - Margin around the SVG.
   * @param {number} [options.initialWidth=960] - Initial width of the SVG.
   * @param {number} [options.initialHeight=570] - Initial height of the SVG.
   * @param {string} [options.elementName=null] - The ID of the HTML element to bind the SVG to. Defaults to 'body' if not provided.
   */
  constructor({
    margin = { top: 20, right: 20, bottom: 50, left: 50 },
    initialWidth = 960,
    initialHeight = 570,
    elementName = null
  } = {}) {
    this.margin = margin;
    this.initialWidth = initialWidth || 1;
    this.initialHeight = initialHeight || 1;
    this.aspectRatio = this.initialHeight / this.initialWidth;

    // Bind to the specified element or the body tag
    const selector = elementName ? `#${elementName}` : "body";
    this.svg = d3.select(selector)
      .append("svg")
      .attr("width", this.initialWidth)
      .attr("height", this.initialHeight)
      .attr("viewBox", `0 0 ${this.initialWidth} ${this.initialHeight}`);

    this.width = this.initialWidth - this.margin.left - this.margin.right;
    this.height = this.initialHeight - this.margin.top - this.margin.bottom;

    // Add defs for arrow head
    const defs = this.svg.append("defs");
    defs.append("marker")
      .attr("id", "arrow-head")
      .attr("orient", "auto-start-reverse")
      .attr("viewBox", "0 0 15 15")
      .attr("markerWidth", "7")
      .attr("markerHeight", "4")
      .attr("refX", "6")
      .attr("refY", "5")
      .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z");

    this.g = this.svg.append("g")
      .attr("id", "canvas")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    // Bind the updateSvgDimensions method to window resize event
    this.updateSvgDimensions();
    window.addEventListener("resize", () => this.updateSvgDimensions());
  }

  updateSvgDimensions() {
  
    const newWidth = window.innerWidth * 0.8;
    const newHeight = newWidth * this.aspectRatio;
    
    // Update the SVG dimensions
    this.svg.attr("width", newWidth)
      .attr("height", newHeight)
      .attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
  
    // Update the width and height properties to reflect the inner drawing area
    this.width = newWidth - this.margin.left - this.margin.right;
    this.height = newHeight - this.margin.top - this.margin.bottom;
  }
}

/**
 * DynamicCanvas Class for creating and managing a resizable canvas element.
 * 
 * @class
 * @property {number} initialWidth - Initial width of the canvas.
 * @property {number} initialHeight - Initial height of the canvas.
 * @property {number} aspectRatio - Aspect ratio of the canvas, calculated as initialWidth / initialHeight.
 * @property {Object} canvas - The canvas element.
 * @property {Object} ctx - The canvas rendering context.
 */
class CANVAS {
  /**
   * Creates a DynamicCanvas instance.
   * 
   * @constructor
   * @param {Object} [options] - Configuration options for the DynamicCanvas instance.
   * @param {number} [options.initialWidth=960] - Initial width of the canvas.
   * @param {number} [options.initialHeight=570] - Initial height of the canvas.
   * @param {string} [options.elementName=null] - The ID of the HTML element to bind the canvas to. Defaults to 'body' if not provided.
   */
  constructor({
    initialWidth = 960,
    initialHeight = 570,
    elementName = null
  } = {}) {
    this.initialWidth = initialWidth;
    this.initialHeight = initialHeight;
    this.aspectRatio = this.initialWidth / this.initialHeight;

    // Bind to the specified element or the body tag
    const selector = elementName ? `#${elementName}` : "body";
    this.canvas = document.querySelector(selector)
      .appendChild(document.createElement('canvas'));
    this.canvas.width = this.initialWidth;
    this.canvas.height = this.initialHeight;
    this.ctx = this.canvas.getContext('2d');

    // Bind the updateCanvasDimensions method to window resize event
    this.updateCanvasDimensions(); // call on initialization
    // window.addEventListener("resize", () => this.updateCanvasDimensions());
  }

  /**
   * Updates the canvas dimensions based on the window size while maintaining the aspect ratio.
   */
  updateCanvasDimensions() {
    const newWidth = window.innerWidth * 0.75;  // 75% of window width
    const newHeight = newWidth / this.aspectRatio;

    // Update the canvas dimensions
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
  }

  get width() {
    return this.canvas.width;
  }
  get height() {
    return this.canvas.height;
  }
}
