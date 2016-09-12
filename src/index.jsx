import React, {Component, PropTypes} from 'react';
import update from 'react-addons-update';
import classNames from 'classnames';

function cycle(length, index) {
    return (length + index) % length;
}

class ReactBasicCarousel extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            position: 0 
        };
    }

    componentWillUnmount() {
        // Cleanup listeners
        clearInterval(this.carouselInterval);
    }

    componentDidMount() {
        if(this.props.autoAdvance) {
            this.carouselInterval = setInterval(this.updatePosition.bind(this), this.props.delay);            
        }        
    }

    updatePosition() {
        this.setState({
            position: this.onCycle(1)
        });
    }

    getChildren() {
        const {
            children
        } = this.props;
        return this.props.collectChildren(children.length ? children : [children]);
    }

    onCycle(amount) {
        const children = this.getChildren();
        return (children.length + (this.state.position + amount)) % children.length;
    }

    onChange(amount, direct) {
        clearInterval(this.carouselInterval);
        this.setState({
            position: direct ? amount : this.onCycle(amount)
        }, this.shareChange);
    }

    shareChange() {
        if(this.props.onChange) {
            this.props.onChange(this.state.position);
        }
    }

    classChild(str) {
        const {
            classNamePrefix,
            classNameChild
        } = this.props;
        return classNamePrefix + classNameChild + str;
    }

    classModifier(str) {
        const {
            classNamePrefix,
            classNameModifier
        } = this.props;
        return classNamePrefix + classNameModifier + str;
    }

    render() {
        const {
            classNamePrefix,
            classNameChild,
            classNameModifier,
            arrows,
            autoWidth
        } = this.props;

        const wrapperClass = classNames(classNamePrefix, this.classModifier(this.state.position), this.props.className);
        const children = this.getChildren();
        const style = autoWidth ? {width: (children.length + 1) * 100 + '%'} : {};

        return <div className={wrapperClass}>
            <div className={this.classChild('content')}>
                <ul className={this.classChild('list')} style={style}>
                    {children.map(this.renderItem.bind(this))}
                </ul>
            </div>
            {arrows && this.renderArrows()}
            <ol className={this.classChild('dots')}>{children.map(this.renderDots.bind(this))}</ol>
        </div>;
    }

    renderItem(item, key) {
        return React.cloneElement(item, {
            className: this.props.classNamePrefix + this.props.classNameChild + 'item',
            key: key
        });
    }

    renderDots(dot, key) {
        const className = classNames(this.classChild('dot'), {
            [`${this.classChild('dot')}${this.props.classNameModifier}active`]: (key === this.state.position)
        })
        return <li key={key} className={className} onClick={this.onChange.bind(this, key, true)}>{this.props.renderDot(key)}</li>
    }

    renderArrows() {
        return <div>
            <div onClick={this.onChange.bind(this, 1, false)}>{this.props.nextArrow}</div>
            <div onClick={this.onChange.bind(this, -1, false)}>{this.props.previousArrow}</div>
        </div>;
    }
}

ReactBasicCarousel.propTypes = {
    arrows: PropTypes.bool,
    autoAdvance: PropTypes.bool,
    autoWidth: PropTypes.bool,
    classNameChild: PropTypes.string,
    classNameModifier: PropTypes.string,
    classNamePrefix: PropTypes.string,
    collectChildren: PropTypes.func,
    delay: PropTypes.number,
    dots: PropTypes.bool,
    nextArrow: PropTypes.string,
    previousArrow: PropTypes.string,
    renderDot: PropTypes.func
};

ReactBasicCarousel.defaultProps = {
    arrows: true,
    autoAdvance: true,
    autoWidth: true,
    classNameChild: '_',
    classNameModifier: '-',
    classNamePrefix: 'Carousel',
    collectChildren: cc => cc,
    delay: 3000,
    dots: true,
    nextArrow: "»",
    previousArrow: "«",
    renderDot: key => key + 1
};

module.exports = ReactBasicCarousel;
