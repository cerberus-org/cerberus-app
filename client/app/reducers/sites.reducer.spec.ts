import { Site, testSites } from '../models/site';
import * as fromSites from './sites.reducer'
import * as SiteActions from '../actions/sites.actions';

describe('siteReducer', () => {
  let sites: Site[];

  beforeEach(() => {
    sites = testSites.slice(0);

  });

  describe('LOAD', () => {

    it('loads sites', () => {
      const state = fromSites.reducer({ sites: sites }, new SiteActions.Load(sites));
      expect(state.sites).toBe(sites);
    });
  });

  describe('ADD', () => {

    it('adds a site', () => {
      const site = Object.assign({}, sites[0]);
      const state = fromSites.reducer({ sites: sites }, new SiteActions.Add(site));
      expect(state.sites[0]).toBe(site);
      expect(state.sites.length).toBe(sites.length + 1);
    });
  });

  describe('MODIFY', () => {

    it('modifies a site', () => {
      const modified = Object.assign({}, sites[0]);
      const state = fromSites.reducer({ sites: sites }, new SiteActions.Modify(modified));
      expect(state.sites[0]).toBe(modified);
    });
  });
});
