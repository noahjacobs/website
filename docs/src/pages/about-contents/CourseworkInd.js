import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ControlledExpansionPanels extends Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>CS 229</Typography>
            <Typography className={classes.secondaryHeading}>Machine Learning (Ng @Stanford)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              This course provides a broad introduction to machine learning and statistical pattern recognition. Topics include: supervised learning (generative/discriminative learning, parametric/non-parametric learning, neural networks, support vector machines); unsupervised learning (clustering, dimensionality reduction, kernel methods); learning theory (bias/variance tradeoffs; VC theory; large margins); reinforcement learning and adaptive control. The course will also discuss recent applications of machine learning, such as to robotic control, data mining, autonomous navigation, bioinformatics, speech recognition, and text and web data processing.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>CS 231n</Typography>
            <Typography className={classes.secondaryHeading}>Convolutional Neural Networks (Karpathy @Stanford)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Computer Vision has become ubiquitous in our society, with applications in search, image understanding, apps, mapping, medicine, drones, and self-driving cars. Core to many of these applications are visual recognition tasks such as image classification, localization and detection. Recent developments in neural network (aka “deep learning”) approaches have greatly advanced the performance of these state-of-the-art visual recognition systems. This course is a deep dive into details of the deep learning architectures with a focus on learning end-to-end models for these tasks, particularly image classification. During the 10-week course, students will learn to implement, train and debug their own neural networks and gain a detailed understanding of cutting-edge research in computer vision. The final assignment will involve training a multi-million parameter convolutional neural network and applying it on the largest image classification dataset (ImageNet). We will focus on teaching how to set up the problem of image recognition, the learning algorithms (e.g. backpropagation), practical engineering tricks for training and fine-tuning the networks and guide the students through hands-on assignments and a final course project.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>EE 263</Typography>
            <Typography className={classes.secondaryHeading}>Intro to Linear Dynamical Systems (Boyd @Stanford)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Applied linear algebra and linear dynamical systems with applications to circuits, signal processing, communications, and control systems. Topics: least-squares approximations of over-determined equations, and least-norm solutions of underdetermined equations. Symmetric matrices, matrix norm, and singular-value decomposition. Eigenvalues, left and right eigenvectors, with dynamical interpretation. Matrix exponential, stability, and asymptotic behavior. Multi-input/multi-output systems, impulse and step matrices; convolution and transfer-matrix descriptions. Control, reachability, and state transfer; observability and least-squares state estimation.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Deep RL Bootcamp</Typography>
            <Typography className={classes.secondaryHeading}>Deep Reinforcement Learning (Abbeel @Berkeley)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Reinforcement learning considers the problem of learning to act and is poised to power next generation AI systems, which will need to go beyond input-output pattern recognition (as has sufficed for speech, vision, machine translation) but will have to generate intelligent behavior. Example application domains include robotics, marketing, dialogue, HVAC, optimizing healthcare and supply chains. Reinforcement learning poses significant challenges beyond pattern recognition, including exploration, credit assignment, stability, safety.  While these challenges are far from solved, there have recently been several major success stories. This includes learning to play Atari games from raw pixels, beating the Go World Champion, learning complex locomotion behaviors, acquiring advanced manipulation skills, and controlling datacenter energy consumption. These successes have relied on the synergy between deep neural nets and reinforcement learning, i.e., deep reinforcement learning (Deep RL). This two-day long bootcamp will teach you the foundations of Deep RL through a mixture of lectures and hands-on lab sessions, so you can go on and build new fascinating applications using these techniques and maybe even push the algorithmic frontier.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
