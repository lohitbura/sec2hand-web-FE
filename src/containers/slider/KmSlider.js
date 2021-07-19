import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import "./rangeslider.css";
import { PRIMARY_COLOR } from '../../services/data';

const useStyles = makeStyles((theme) => ({
  
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};





const AirbnbSlider = withStyles({
  root: {
    color: PRIMARY_COLOR,
    height: 3,
    padding: "13px 0",
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -13,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px",
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

export default class KmSlider extends React.Component {

  constructor(props) {
    super(props)
    
    this.handleChangeKm = this.handleChangeKm.bind(this);
  
    this.state = {
         km:[1000,150000]
    }
}

   handleChangeKm(e , newKm){
    this.setState({
      km :newKm
    });
    this.props.parentCallback(newKm);
    
  }

  render()
  {
    
    const {km} = this.state;
  
          return (
              <>
            <div className="mt-5">
                <div className={useStyles.root} >
                
                    <Typography gutterBottom>Distance Driven Range :</Typography>
                    <AirbnbSlider
                        ThumbComponent={AirbnbThumbComponent}
                        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                        defaultValue={km}
                        onChange={this.handleChangeKm}
                        min={1000}
                        step={1000}
                        max={150000}
                    />
                </div>
                <div className="priceDiv">
                <div className="mr-3">{km[0] } Km </div> 
                to
                <div className="ml-3"> {km[1] } Km</div>
                </div>
            </div>
            </>
          );
  }
}
