var React = require('react');
var update = require('react-addons-update');
import classNames from 'classnames';

function cycle(length, index) {
    return (length + index) % length;
}

var ReactBasicCarousel = React.createClass({
    displayName: 'ReactBasicCarousel',
    getDefaultProps() {
        return {
            dots: true,
            autoAdvance: true,
            delay: 3000,
            classNamePrefix: 'Carousel',
            classNameChild: '_',
            classNameModifier: '-',
            nextArrow: "»",
            previousArrow: "«",
            renderDot: (key) => key + 1,
            collectChildren: (cc) => cc
        };
    },
    getInitialState() {
        return {
            position: 0 
        };
    },
    componentWillUnmount() {
        // Cleanup listeners
        clearInterval(this.carouselInterval);
    },
    componentDidMount() {
        if (this.props.autoAdvance) {
            this.carouselInterval = setInterval(this.updatePosition, this.props.delay);            
        }        
    },
    updatePosition() {
        this.setState({
            position: this.onCycle(1)
        });
    },
    getChildren() {
        var {children} = this.props;
        return this.props.collectChildren((children.length) ? children : [children]);
    },
    onCycle(ammount) {
        var children = this.getChildren();
        return (children.length + (this.state.position + ammount)) % children.length;
    },
    onChange(ammount, direct) {
        clearInterval(this.carouselInterval);
        this.setState({
            position: (direct) ? ammount : this.onCycle(ammount)
        }, this.shareChange);
    },
    shareChange() {
        if(this.props.onChange) {
            this.props.onChange(this.state.position);
        }
    },
    classChild(str) {
        var {classNamePrefix, classNameChild} = this.props;
        return classNamePrefix + classNameChild + str;
    },
    classModifier(str) {
        var {classNamePrefix, classNameModifier} = this.props;
        return classNamePrefix + classNameModifier + str;
    },
    render() {
        var {classNamePrefix, classNameChild, classNameModifier} = this.props;
        var wrapperClass = classNames(classNamePrefix, this.classModifier(this.state.position), this.props.className);
        var children = this.getChildren();
        return (
            <div className={wrapperClass}>
                <div className={this.classChild('content')}>
                    <ul className={this.classChild('list')} style={{width: (children.length + 1) * 100 + '%'}}>
                        {children.map(this.renderItem)}
                    </ul>
                </div>
                {this.renderArrows()}
                <ol className={this.classChild('dots')}>{children.map(this.renderDots)}</ol>
            </div>            
        );
    },
    renderItem(item, key) {
        return React.cloneElement(item, {
            className: this.props.classNamePrefix + this.props.classNameChild + 'item',
            key: key
        });
    },
    renderDots(dot, key) {
        var className = classNames(this.classChild('dot'), {
            [`${this.classChild('dot')}${this.props.classNameModifier}active`]: (key === this.state.position)
        })
        return <li key={key} className={className} onClick={this.onChange.bind(this, key, true)}>{this.props.renderDot(key)}</li>
    },
    renderArrows() {
        return <div>
            <div onClick={this.onChange.bind(this, 1, false)}>{this.props.nextArrow}</div>
            <div onClick={this.onChange.bind(this, -1, false)}>{this.props.previousArrow}</div>
        </div>;
    }
});

module.exports = ReactBasicCarousel;
