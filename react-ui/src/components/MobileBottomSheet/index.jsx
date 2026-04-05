import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdFilterList, MdAccessTime } from 'react-icons/md';
import { IoNotifications } from 'react-icons/io5';

import { availableIncidentTypesSelector, incidentsSelector } from '../../store/selectors';
import useBottomSheetDrag from '../../hooks/useBottomSheetDrag';

import IncidentFilter from '../incidentFilter';
import RecentIncidentFeed from '../RecentIncidentFeed';
import DateSelector from '../DateSelector';

import {
  SheetBackdrop,
  SheetContainer,
  DragHandleArea,
  DragHandleBar,
  TabBar,
  Tab,
  TabLabel,
  TabBadge,
  DotIndicator,
  ContentPane,
} from './components';

const PRESETS = [
  { label: '24h', hours: 24 },
  { label: '2d', hours: 48 },
  { label: '3d', hours: 72 },
  { label: '1w', hours: 168 },
];

function MobileBottomSheet({ sheetState, setSheetState }) {
  const sheetRef = useRef(null);
  const [activeTab, setActiveTab] = React.useState('filters');
  const lastSeenTime = useRef(null);
  const [hasNew, setHasNew] = React.useState(false);

  const { dragHandleProps } = useBottomSheetDrag(sheetRef, sheetState, setSheetState);

  // Badge data: filter counts
  const filters = useSelector(state => state.incidentFilter.types);
  const availableTypes = useSelector(availableIncidentTypesSelector);
  const visibleCount = filters.filter(f => availableTypes.includes(f)).length;
  const totalCount = availableTypes.length;

  // Badge data: time range
  const dateMin = useSelector(state => state.incidentFilter.date.min);
  const dateMax = useSelector(state => state.incidentFilter.date.max);
  const timeLabel = React.useMemo(() => {
    const preset = PRESETS.find(p => dateMin === 0 && p.hours === dateMax);
    return preset ? preset.label : 'Custom';
  }, [dateMin, dateMax]);

  // Badge data: new incidents
  const incidents = useSelector(incidentsSelector);
  const latestTime = React.useMemo(() => {
    if (!incidents.length) return null;
    return Math.max(...incidents.map(i => new Date(i.time).getTime()));
  }, [incidents]);

  useEffect(() => {
    if (activeTab === 'feed' && sheetState !== 'collapsed') {
      lastSeenTime.current = latestTime;
      setHasNew(false);
    } else if (latestTime && lastSeenTime.current && latestTime > lastSeenTime.current) {
      setHasNew(true);
    }
  }, [activeTab, sheetState, latestTime]);

  // Initialize lastSeenTime on mount
  useEffect(() => {
    if (latestTime && !lastSeenTime.current) {
      lastSeenTime.current = latestTime;
    }
  }, [latestTime]);

  const handleTabClick = (tab) => {
    if (sheetState === 'collapsed') {
      setActiveTab(tab);
      setSheetState('half');
    } else if (activeTab === tab) {
      setSheetState('collapsed');
    } else {
      setActiveTab(tab);
    }
  };

  const collapse = () => setSheetState('collapsed');

  return (
    <>
      <SheetBackdrop $visible={sheetState !== 'collapsed'} onClick={collapse} />
      <SheetContainer ref={sheetRef} $state={sheetState}>
        <DragHandleArea {...dragHandleProps}>
          <DragHandleBar />
        </DragHandleArea>

        <TabBar>
          <Tab $active={activeTab === 'filters'} onClick={() => handleTabClick('filters')}>
            <MdFilterList />
            <TabLabel>
              Filters
              <TabBadge>{visibleCount}/{totalCount}</TabBadge>
            </TabLabel>
          </Tab>

          <Tab $active={activeTab === 'feed'} onClick={() => handleTabClick('feed')}>
            {hasNew && <DotIndicator />}
            <IoNotifications />
            <TabLabel>Feed</TabLabel>
          </Tab>

          <Tab $active={activeTab === 'time'} onClick={() => handleTabClick('time')}>
            <MdAccessTime />
            <TabLabel>
              Time
              <TabBadge>{timeLabel}</TabBadge>
            </TabLabel>
          </Tab>
        </TabBar>

        <ContentPane>
          {activeTab === 'filters' && <IncidentFilter embedded />}
          {activeTab === 'feed' && <RecentIncidentFeed embedded />}
          {activeTab === 'time' && <DateSelector embedded />}
        </ContentPane>
      </SheetContainer>
    </>
  );
}

export default MobileBottomSheet;
