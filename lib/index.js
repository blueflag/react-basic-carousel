'use strict';

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var update = require('react-addons-update');


function cycle(length, index) {
    return (length + index) % length;
}

var ReactBasicCarousel = React.createClass({
    displayName: 'ReactBasicCarousel',
    getDefaultProps: function getDefaultProps() {
        return {
            dots: true,
            autoAdvance: true,
            delay: 3000,
            classNamePrefix: 'Carousel',
            classNameChild: '_',
            classNameModifier: '-',
            nextArrow: "»",
            previousArrow: "«",
            renderDot: function renderDot(key) {
                return key + 1;
            },
            collectChildren: function collectChildren(cc) {
                return cc;
            }
        };
    },
    getInitialState: function getInitialState() {
        return {
            position: 0
        };
    },
    componentWillUnmount: function componentWillUnmount() {
        // Cleanup listeners
        clearInterval(this.carouselInterval);
    },
    componentDidMount: function componentDidMount() {
        if (this.props.autoAdvance) {
            this.carouselInterval = setInterval(this.updatePosition, this.props.delay);
        }
    },
    updatePosition: function updatePosition() {
        this.setState({
            position: this.onCycle(1)
        });
    },
    getChildren: function getChildren() {
        var children = this.props.children;

        return this.props.collectChildren(children.length ? children : [children]);
    },
    onCycle: function onCycle(ammount) {
        var children = this.getChildren();
        return (children.length + (this.state.position + ammount)) % children.length;
    },
    onChange: function onChange(ammount, direct) {
        clearInterval(this.carouselInterval);
        this.setState({
            position: direct ? ammount : this.onCycle(ammount)
        }, this.shareChange);
    },
    shareChange: function shareChange() {
        if (this.props.onChange) {
            this.props.onChange(this.state.position);
        }
    },
    classChild: function classChild(str) {
        var _props = this.props;
        var classNamePrefix = _props.classNamePrefix;
        var classNameChild = _props.classNameChild;

        return classNamePrefix + classNameChild + str;
    },
    classModifier: function classModifier(str) {
        var _props2 = this.props;
        var classNamePrefix = _props2.classNamePrefix;
        var classNameModifier = _props2.classNameModifier;

        return classNamePrefix + classNameModifier + str;
    },
    render: function render() {
        var _props3 = this.props;
        var classNamePrefix = _props3.classNamePrefix;
        var classNameChild = _props3.classNameChild;
        var classNameModifier = _props3.classNameModifier;

        var wrapperClass = (0, _classnames2.default)(classNamePrefix, this.classModifier(this.state.position), this.props.className);
        var children = this.getChildren();
        return React.createElement(
            'div',
            { className: wrapperClass },
            React.createElement(
                'div',
                { className: this.classChild('content') },
                React.createElement(
                    'ul',
                    { className: this.classChild('list'), style: { width: (children.length + 1) * 100 + '%' } },
                    children.map(this.renderItem)
                )
            ),
            this.renderArrows(),
            React.createElement(
                'ol',
                { className: this.classChild('dots') },
                children.map(this.renderDots)
            )
        );
    },
    renderItem: function renderItem(item, key) {
        return React.cloneElement(item, {
            className: this.props.classNamePrefix + this.props.classNameChild + 'item',
            key: key
        });
    },
    renderDots: function renderDots(dot, key) {
        var className = (0, _classnames2.default)(this.classChild('dot'), _defineProperty({}, '' + this.classChild('dot') + this.props.classNameModifier + 'active', key === this.state.position));
        return React.createElement(
            'li',
            { key: key, className: className, onClick: this.onChange.bind(this, key, true) },
            this.props.renderDot(key)
        );
    },
    renderArrows: function renderArrows() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { onClick: this.onChange.bind(this, 1, false) },
                this.props.nextArrow
            ),
            React.createElement(
                'div',
                { onClick: this.onChange.bind(this, -1, false) },
                this.props.previousArrow
            )
        );
    }
});

module.exports = ReactBasicCarousel;
