import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import "./rangeslider.css";

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
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0 2px 2px',
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
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

// export default function RangeSlider() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState([200000, 600000]);
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
 

//   return (
//       <>
//       <div>
//     <div className={classes.root}>
     
//       <Typography gutterBottom>Select Price Range :</Typography>
//       <AirbnbSlider
//         ThumbComponent={AirbnbThumbComponent}
//         getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
//         defaultValue={value}
//         onChange={handleChange}
//         min={1000}
//         step={1000}
//         max={1000000}
//       />
//     </div>
//     <div className="priceDiv">
//     <div className="mr-3">{value[0] }Rs. </div> 
//     to
//     <div className="ml-3"> {value[1] }Rs.</div>
//     </div>
//     </div>
    
//     </>
//   );
// }
export default class RangeSlider extends React.Component {

  constructor(props) {
    super(props)
    
    this.handleChange = this.handleChange.bind(this);
  
    this.state = {
         value:[200000, 600000]
    }
}

   handleChange(e , newValue){
    this.setState({
      value :newValue
    });
    this.props.parentCallback(newValue);
    
  }

  render()
  {
    
    const {value} = this.state;
  
          return (
              <>
            <div className="mt-5">
                <div className={useStyles.root} >
                
                    <Typography gutterBottom>Select Price Range :</Typography>
                    <AirbnbSlider
                        ThumbComponent={AirbnbThumbComponent}
                        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                        defaultValue={value}
                        onChange={this.handleChange}
                        min={1000}
                        step={1000}
                        max={1000000}
                    />
                </div>
                <div className="priceDiv">
                <div className="mr-3">{value[0] } Rs. </div> 
                to
                <div className="ml-3"> {value[1] } Rs. </div>
                </div>
            </div>
            </>
          );
  }
}