import React, { useState } from 'react'
import { Button, Modal, Fade, Slide, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import * as d3 from 'd3'

import Table from './Table'
import { Theme } from './Theme'


export const App = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left')
  const [slideIn, setSlideIn] = useState(true)
  d3.select("body")
  .data([1,2,3])
  .style("background-color", (d) => { console.log(d); return "lightray"});


  const onNavClick = (direction: 'left' | 'right') => {
      const increment = direction === 'left' ? -1 : 1;
      const newIndex = (step + increment + 3) % 3;

      const oppDirection = direction === 'left' ? 'right' : 'left';
      setSlideDirection(direction);
      setSlideIn(false);

      setTimeout(() => {
        setStep(newIndex);
        setSlideDirection(oppDirection);
        setSlideIn(true);
      }, 200);
  }

  const onClose = () => {
    setOpen(false)
    setTimeout(() => setStep(0), 100)
  }

  return (
    <div className={classes.container}>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        className={classes.button}
      >
        Hello World
      </Button>
        <Modal className={classes.modal} open={open} onClose={onClose} style={{padding: '30px'}}>
          <Fade in={open} >
            <div className={classes.modalContent}>
              <Slide
                in={slideIn}
                direction={slideDirection}
                appear={false}
                timeout={{appear: 150, enter: 150, exit: 25}}
                unmountOnExit={true}
              >
                <div style={{height: '100%'}}>
                  <Steps step={step} setStep={onNavClick} onClose={onClose}/>
                </div>
              </Slide>
            </div>
          </Fade>
        </Modal>
    </div>
  );
}

const Steps = ({step, setStep, onClose}: { step: number, setStep: (direction: 'left' | 'right') => void, onClose: () => void }) => {
  const classes = useStyles()
  switch(step) {
    case 0:
      return (
        <Fade in={true} timeout={500}>
          <div className={classes.content}>
            <Typography variant="h4" gutterBottom>STEP 0</Typography>
            <Table/>
            <Button
              onClick={() => setStep('right')}
              color="primary"
              disableRipple={true}
              variant="outlined"
              className={classes.button}
              style={{alignSelf: 'flex-end'}}
            >
              Next
            </Button>
          </div>
        </Fade>
      )
    case 1:
      return (
        <Fade in={true} timeout={500}>
          <div className={classes.content}>
            <Typography variant="h4" gutterBottom>STEP 1</Typography>
            <Table/>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <Button
                onClick={() => setStep('left')}
                color="primary"
                disableRipple={true}
                variant="outlined"
                className={classes.button}
                style={{alignSelf: 'flex-start'}}
              >
                Previous
              </Button>
              <Button
                style={{alignSelf: 'flex-end'}}
                onClick={() => setStep('right')}
                color="primary"
                disableRipple={true}
                variant="outlined"
                className={classes.button}
              >
                Next
              </Button>
            </div>
          </div>
        </Fade>
      )
    case 2:
      return (
        <Fade in={true} timeout={500}>
          <div className={classes.content}>
            <Typography variant="h4" gutterBottom>STEP 2</Typography>
            <Table/>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <Button
                onClick={() => setStep('left')}
                color="primary"
                disableRipple={true}
                variant="outlined"
                className={classes.button}
                style={{alignSelf: 'flex-start'}}
              >
                Previous
              </Button>
              <Button
                onClick={onClose}
                color="primary"
                disableRipple={true}
                variant="outlined"
                className={classes.button}
                style={{alignSelf: 'flex-end'}}
              >
                Close
              </Button>
            </div>
          </div>
        </Fade>
      )
    default:
      return null
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  button: {
    backgroundColor: theme.colors.clear,
    minWidth: '110px'
  },
  modal: {
    display: 'grid',
    placeItems: 'center',
    overflow: 'hidden'
  },
  modalContent: {
    height: '75vh',
    maxWidth: '700px',
    width: '100%',
    backgroundColor: '#F6F6F9',
    borderRadius: 4,
    overflow: 'hidden',
    padding: '50px',
    '&:focus': {
      outline: 'none'
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F9',
    height: '100%'
  }
}));
