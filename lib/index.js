'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function cycle(length, index) {
    return (length + index) % length;
}

var ReactBasicCarousel = function (_Component) {
    _inherits(ReactBasicCarousel, _Component);

    function ReactBasicCarousel(props) {
        _classCallCheck(this, ReactBasicCarousel);

        var _this = _possibleConstructorReturn(this, (ReactBasicCarousel.__proto__ || Object.getPrototypeOf(ReactBasicCarousel)).call(this, props));

        _this.state = {
            position: 0
        };
        return _this;
    }

    _createClass(ReactBasicCarousel, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // Cleanup listeners
            clearInterval(this.carouselInterval);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.autoAdvance) {
                this.carouselInterval = setInterval(this.updatePosition.bind(this), this.props.delay);
            }
        }
    }, {
        key: 'updatePosition',
        value: function updatePosition() {
            this.setState({
                position: this.onCycle(1)
            });
        }
    }, {
        key: 'getChildren',
        value: function getChildren() {
            var children = this.props.children;

            return this.props.collectChildren(children.length ? children : [children]);
        }
    }, {
        key: 'onCycle',
        value: function onCycle(amount) {
            var children = this.getChildren();
            return (children.length + (this.state.position + amount)) % children.length;
        }
    }, {
        key: 'onChange',
        value: function onChange(amount, direct) {
            clearInterval(this.carouselInterval);
            this.setState({
                position: direct ? amount : this.onCycle(amount)
            }, this.shareChange);
        }
    }, {
        key: 'shareChange',
        value: function shareChange() {
            if (this.props.onChange) {
                this.props.onChange(this.state.position);
            }
        }
    }, {
        key: 'classChild',
        value: function classChild(str) {
            var _props = this.props;
            var classNamePrefix = _props.classNamePrefix;
            var classNameChild = _props.classNameChild;

            return classNamePrefix + classNameChild + str;
        }
    }, {
        key: 'classModifier',
        value: function classModifier(str) {
            var _props2 = this.props;
            var classNamePrefix = _props2.classNamePrefix;
            var classNameModifier = _props2.classNameModifier;

            return classNamePrefix + classNameModifier + str;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props;
            var classNamePrefix = _props3.classNamePrefix;
            var classNameChild = _props3.classNameChild;
            var classNameModifier = _props3.classNameModifier;
            var arrows = _props3.arrows;
            var autoWidth = _props3.autoWidth;


            var wrapperClass = (0, _classnames2.default)(classNamePrefix, this.classModifier(this.state.position), this.props.className);
            var children = this.getChildren();
            var style = autoWidth ? { width: (children.length + 1) * 100 + '%' } : {};

            return _react2.default.createElement(
                'div',
                { className: wrapperClass },
                _react2.default.createElement(
                    'div',
                    { className: this.classChild('content') },
                    _react2.default.createElement(
                        'ul',
                        { className: this.classChild('list'), style: style },
                        children.map(this.renderItem.bind(this))
                    )
                ),
                arrows && this.renderArrows(),
                _react2.default.createElement(
                    'ol',
                    { className: this.classChild('dots') },
                    children.map(this.renderDots.bind(this))
                )
            );
        }
    }, {
        key: 'renderItem',
        value: function renderItem(item, key) {
            var className = (0, _classnames2.default)(this.classChild('item'), _defineProperty({}, '' + this.classChild('item') + this.props.classNameModifier + 'active', key === this.state.position));

            return _react2.default.cloneElement(item, {
                className: className,
                key: key
            });
        }
    }, {
        key: 'renderDots',
        value: function renderDots(dot, key) {
            var className = (0, _classnames2.default)(this.classChild('dot'), _defineProperty({}, '' + this.classChild('dot') + this.props.classNameModifier + 'active', key === this.state.position));
            return _react2.default.createElement(
                'li',
                { key: key, className: className, onClick: this.onChange.bind(this, key, true) },
                this.props.renderDot(key)
            );
        }
    }, {
        key: 'renderArrows',
        value: function renderArrows() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { onClick: this.onChange.bind(this, 1, false) },
                    this.props.nextArrow
                ),
                _react2.default.createElement(
                    'div',
                    { onClick: this.onChange.bind(this, -1, false) },
                    this.props.previousArrow
                )
            );
        }
    }]);

    return ReactBasicCarousel;
}(_react.Component);

ReactBasicCarousel.propTypes = {
    arrows: _react.PropTypes.bool,
    autoAdvance: _react.PropTypes.bool,
    autoWidth: _react.PropTypes.bool,
    classNameChild: _react.PropTypes.string,
    classNameModifier: _react.PropTypes.string,
    classNamePrefix: _react.PropTypes.string,
    collectChildren: _react.PropTypes.func,
    delay: _react.PropTypes.number,
    dots: _react.PropTypes.bool,
    nextArrow: _react.PropTypes.string,
    previousArrow: _react.PropTypes.string,
    renderDot: _react.PropTypes.func
};

ReactBasicCarousel.defaultProps = {
    arrows: true,
    autoAdvance: true,
    autoWidth: true,
    classNameChild: '_',
    classNameModifier: '-',
    classNamePrefix: 'Carousel',
    collectChildren: function collectChildren(cc) {
        return cc;
    },
    delay: 3000,
    dots: true,
    nextArrow: "»",
    previousArrow: "«",
    renderDot: function renderDot(key) {
        return key + 1;
    }
};

module.exports = ReactBasicCarousel;
