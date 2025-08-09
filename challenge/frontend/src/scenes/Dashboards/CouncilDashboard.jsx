import React, { useState, useEffect } from 'react';
import { baseComplaintUrl, rootUrl } from '../../config';
import CasesTable from '../../components/Tables/CasesTable';
import MetricsCard from '../../components/Cards/MetricsCard';
import {
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
  container: {
    padding: theme.spacing(3),
    background: theme.palette.background.default,
    minHeight: '100vh',
  },
}));

const CouncilDashboard = ({ districtId, onLogout }) => {
  const classes = useStyles();
  const [complaints, setComplaints] = useState([]);
  const [openCases, setOpenCases] = useState([]);
  const [closedCases, setClosedCases] = useState([]);
  const [topComplaintTypes, setTopComplaintTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConstituents, setShowConstituents] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const url = showConstituents
          ? `${baseComplaintUrl}/constituentsComplaints/`
          : `${baseComplaintUrl}/allComplaints/`;
        const res = await axios.get(url, {
          headers: { Authorization: `Token ${token}` }
        });
        setComplaints(res.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [token, showConstituents]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [allRes, openRes, closedRes, topRes] = await Promise.all([
          axios.get(`${baseComplaintUrl}/allComplaints/`, {
            headers: { Authorization: `Token ${token}` }
          }),
          axios.get(`${baseComplaintUrl}/openCases/`, {
            headers: { Authorization: `Token ${token}` }
          }),
          axios.get(`${baseComplaintUrl}/closedCases/`, {
            headers: { Authorization: `Token ${token}` }
          }),
          axios.get(`${baseComplaintUrl}/topComplaints/`, {
            headers: { Authorization: `Token ${token}` }
          }),
        ]);
        setComplaints(allRes.data);
        setOpenCases(openRes.data);
        setClosedCases(closedRes.data);
        setTopComplaintTypes(topRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <Box className={classes.container}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  const topType = topComplaintTypes.length > 0 ? topComplaintTypes[0].complaint_type : '—';
  const cardMetrics = [
    { title: 'Open Cases', value: openCases.length },
    { title: 'Closed Cases', value: closedCases.length },
    { title: 'Top Complaint Type', value: topType },
  ];

  return (
    <Box className={classes.container}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="outlined" color="secondary" onClick={onLogout}>
          Logout
        </Button>
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowConstituents((prev) => !prev)}
        >
          {showConstituents ? "Show All Complaints" : "Complaints by My Constituents"}
        </Button>
      </Box>
      <Typography variant="h4" className={classes.header} align="center">
        NYC Council District {districtId} Dashboard
      </Typography>
      <Grid container spacing={2}>
        {cardMetrics.map(({ title, value }) => (
          <Grid item xs={12} md={4} key={title}>
            <MetricsCard title={title} value={value} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Paper elevation={2}>
            <CasesTable complaints={complaints} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CouncilDashboard;