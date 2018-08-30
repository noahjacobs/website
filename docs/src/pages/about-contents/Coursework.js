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
            <Typography className={classes.heading}>CS 61A</Typography>
            <Typography className={classes.secondaryHeading}>Structure and Interpretation of Computer Programs (Python based)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Introduction to programming and computer science. This course exposes students to techniques of abstraction at several levels: (a) within a programming language, using higher-order functions, manifest types, data-directed programming, and message-passing; (b) between programming languages, using functional and rule-based languages as examples. It also relates these techniques to the practical problems of implementation of languages and algorithms on a von Neumann machine. There are several significant programming projects.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>CS 61B</Typography>
            <Typography className={classes.secondaryHeading}>Data Structures (Java based)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Fundamental dynamic data structures, including linear lists, queues, trees, and other linked structures; arrays strings, and hash tables. Storage management. Elementary principles of software engineering. Abstract data types. Algorithms for sorting and searching. Introduction to the Java programming language.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>CS 61C</Typography>
            <Typography className={classes.secondaryHeading}>Computer Architecrture (C based)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              The internal organization and operation of digital computers. Machine architecture, support for high-level languages (logic, arithmetic, instruction sequencing) and operating systems (I/O, interrupts, memory management, process switching). Elements of computer logic design. Tradeoffs involved in fundamental architectural design decisions.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>CS 70</Typography>
            <Typography className={classes.secondaryHeading}>Discrete Mathematics and Probability Theory</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Logic, infinity, and induction; applications include undecidability and stable marriage problem. Modular arithmetic and GCDs; applications include primality testing and cryptography. Polynomials; examples include error correcting codes and interpolation. Probability including sample spaces, independence, random variables, law of large numbers; examples include load balancing, existence arguments, Bayesian inference.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>CS 160</Typography>
            <Typography className={classes.secondaryHeading}>User Interface Design</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              The design, implementation, and evaluation of user interfaces. User-centered design and task analysis. Conceptual models and interface metaphors. Usability inspection and evaluation methods. Analysis of user study data. Input methods (keyboard, pointing, touch, tangible) and input models. Visual design principles. Interface prototyping and implementation methodologies and tools. Students will develop a user interface for a specific task and target user group in teams.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>CS 161</Typography>
            <Typography className={classes.secondaryHeading}>Computer Security</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Introduction to computer security. Cryptography, including encryption, authentication, hash functions, cryptographic protocols, and applications. Operating system security, access control. Network security, firewalls, viruses, and worms. Software security, defensive programming, and language-based security. Case studies from real-world systems.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel7'} onChange={this.handleChange('panel7')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>CS 162</Typography>
            <Typography className={classes.secondaryHeading}>Operating Systems</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Basic concepts of operating systems and system programming. Utility programs, subsystems, multiple-program systems. Processes, interprocess communication, and synchronization. Memory allocation, segmentation, paging. Loading and linking, libraries. Resource allocation, scheduling, performance evaluation. File systems, storage devices, I/O systems. Protection, security, and privacy.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel8'} onChange={this.handleChange('panel8')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>CS 170</Typography>
            <Typography className={classes.secondaryHeading}>Algorithms and Intractable Problems</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Concept and basic techniques in the design and analysis of algorithms; models of computation; lower bounds; algorithms for optimum search trees, balanced trees and UNION-FIND algorithms; numerical and algebraic algorithms; combinatorial algorithms. Turing machines, how to count steps, deterministic and nondeterministic Turing machines, NP-completeness. Unsolvable and intractable problems.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel9'} onChange={this.handleChange('panel9')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>CS 184</Typography>
            <Typography className={classes.secondaryHeading}>Computer Graphics</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Techniques of modeling objects for the purpose of computer rendering: boundary representations, constructive solids geometry, hierarchical scene descriptions. Mathematical techniques for curve and surface representation. Basic elements of a computer graphics rendering pipeline; architecture of modern graphics display devices. Geometrical transformations such as rotation, scaling, translation, and their matrix representations. Homogeneous coordinates, projective and perspective transformations. Algorithms for clipping, hidden surface removal, rasterization, and anti-aliasing. Scan-line based and ray-based rendering algorithms. Lighting models for reflection, refraction, transparency.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel10'} onChange={this.handleChange('panel10')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>CS 188</Typography>
            <Typography className={classes.secondaryHeading}>Artificial Intelligence</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Ideas and techniques underlying the design of intelligent computer systems. Topics include search, game playing, knowledge representation, inference, planning, reasoning under uncertainty, machine learning, robotics, perception, and language understanding.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel11'} onChange={this.handleChange('panel12')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>EE 16A</Typography>
            <Typography className={classes.secondaryHeading}>Designing Information Devices and Systems I</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              This course and its follow-on course EE16B focus on the fundamentals of designing modern information devices and systems that interface with the real world. Together, this course sequence provides a comprehensive foundation for core EECS topics in signal processing, learning, control, and circuit design while introducing key linear-algebraic concepts motivated by application contexts. Modeling is emphasized in a way that deepens mathematical maturity, and in both labs and homework, students will engage computationally, physically, and visually with the concepts being introduced in addition to traditional paper/pencil exercises. The courses are aimed at entering students as well as non-majors seeking a broad foundation for the field.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel12'} onChange={this.handleChange('panel13')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Math 54</Typography>
            <Typography className={classes.secondaryHeading}>Linear Algebra and Differential Equations</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Basic linear algebra; matrix arithmetic and determinants. Vector spaces; inner product spaces. Eigenvalues and eigenvectors; linear transformations, symmetric matrices. Linear ordinary differential equations (ODE); systems of linear ODE.  Fourier series.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel13'} onChange={this.handleChange('panel16')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Cog Sci 1</Typography>
            <Typography className={classes.secondaryHeading}>Intro to Cognitive Science</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              This course introduces the interdisciplinary field of cognitive science. Lectures and readings will survey research from artificial intelligence, pyschology, linguistics, philosophy, and neuroscience, and will cover topics such as the nature of knowledge, thinking, remembering, vision, imagery, language, and consciousness. Sections will demonstrate some of the major methodologies.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel14'} onChange={this.handleChange('panel17')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>MCB C61</Typography>
            <Typography className={classes.secondaryHeading}>Brain, Mind, and Behavior</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Introduction to human brain mechanisms of sensation, movement, perception, thinking, learning, memory, and emotion in terms of anatomy, physiology, and chemistry of the nervous system in health and disease. Intended for students in the humanities and social sciences and others not majoring in the biological sciences.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel15'} onChange={this.handleChange('panel18')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>COGSCI C100</Typography>
            <Typography className={classes.secondaryHeading}>Basic Issues in Cognition</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Theoretical foundations and current controversies in cognitive science will be discussed. Basic issues in cognition--including perception, imagery, memory, categorization, thinking, judgment, and development--will be considered from the perspectives of philosophy, psychology, computer science, and physiology. Particular emphasis will be placed on the nature, implications, and limitations of the computational model of mind.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel16'} onChange={this.handleChange('panel19')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>LING 100</Typography>
            <Typography className={classes.secondaryHeading}>Intro to Linguistic Science</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              An intensive introduction of linguistic analysis, including core areas such as phonetics and phonology, morphology, and syntax and semantics, with data from a range of languages. Argumentation and writing skills are developed through substantial weekly homework assignments.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel17'} onChange={this.handleChange('panel20')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>PSYCH 160</Typography>
            <Typography className={classes.secondaryHeading}>Social Psychology</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Survey of social psychology including interaction processes, small groups, attitudes and attitude change, and social problems.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel18'} onChange={this.handleChange('panel21')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>PHILO 132</Typography>
            <Typography className={classes.secondaryHeading}>Philosophy of Mind</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Mind and matter; other minds; the concept "person."
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel19'} onChange={this.handleChange('panel22')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>MUSIC 109</Typography>
            <Typography className={classes.secondaryHeading}>Music and Cognition</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              The goal of this class is to interrogate and make explicit the powerful musical intuitions that are at work as you make sense of the music all around you. What is the nature of the knowledge that is guiding these intuitions? How does this knowledge develop in ordinary and extraordinary ways? To approach these questions, small composition-like projects aided by a specially designed computer music environment will function as a workplace. You will explore, experiment, question, and reflect on how and what you know how to do as you generate the musical coherence that you seem simply to find.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel20'} onChange={this.handleChange('panel23')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>INFO 103</Typography>
            <Typography className={classes.secondaryHeading}>History of Information</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              This course explores the history of information and associated technologies, uncovering why we think of ours as "the information age." We will select moments in the evolution of production, recording, and storage from the earliest writing systems to the world of Short Message Service (SMS) and blogs. In every instance, we'll be concerned with both what and when and how and why, and we will keep returning to the question of technological determinism: how do technological developments affect society and vice versa?
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel21'} onChange={this.handleChange('panel24')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>ASTRO C10</Typography>
            <Typography className={classes.secondaryHeading}>General Astronomy</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              A description of modern astronomy with emphasis on the structure and evolution of stars, galaxies, and the Universe. Additional topics optionally discussed include quasars, pulsars, black holes, and extraterrestrial communication, etc. Individual instructor's synopses available from the department.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel22'} onChange={this.handleChange('panel24')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>PSYCH 133</Typography>
            <Typography className={classes.secondaryHeading}>Psychology of Sleep</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              This course has two primary goals: (1) to provide a basic introduction to the study of sleep and an overview of sleep measurement, regulation, ontogeny, phylogeny, physiology, and psychology; and (2) to provide a basic introduction to sleep disorders including their classification, cause, and treatment.
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
