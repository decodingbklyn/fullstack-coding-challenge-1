import React, { useState, useEffect } from 'react';
import CasesTable from '../Tables/CasesTable';
import MetricsCard from '../Cards/MetricsCard';
import {
  Typography,
  Grid
} from '@material-ui/core';
import axios from 'axios';

const CouncilDashboard = ({ districtId }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`/api/complaints?district=${districtId}`);
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [districtId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const openCases = complaints.filter(c => c.openDate && !c.closeDate).length;
  const closedCases = complaints.filter(c => c.closeDate).length;

  const entries = Object.entries(
    complaints.reduce((acc, { type }) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);
  const topType = entries.length > 0 ? entries[0][0] : '—';
  const cardMetrics = [
    { title: 'Open Cases', value: openCases },
    { title: 'Closed Cases', value: closedCases },
    { title: 'Top Complaint Type', value: topType },
  ];
  return (
    <Grid container spacing={2}>
      {cardMetrics.map(({ title, value }) => (
        <Grid item xs={12} md={4} key={title}>
          <MetricsCard title={title} value={value} />
        </Grid>
      ))}

      <CasesTable complaints={complaints} />
    </Grid>
  );
};

export default CouncilDashboard;