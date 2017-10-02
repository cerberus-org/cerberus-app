import { testSites, Site } from '../models/site';
import * as fromSites from './sites.reducer'
import * as SiteActions from '../actions/sites.actions';

describe('siteReducer', () => {
  let sites: Site[];

  beforeEach(() => {
    sites = testSites.slice(0);

  });

  it('loads sites', () => {
    const result = fromSites.reducer({ sites: sites }, new SiteActions.LoadSites(sites)).sites;
    expect(result).toBe(sites);
  });

  it('adds a site', () => {
    const site = Object.assign({}, sites[0]);
    const result = fromSites.reducer({ sites: sites }, new SiteActions.AddSite(site)).sites;
    expect(result[0]).toBe(site);
    expect(result.length).toBe(sites.length + 1);
  });

  it('modifies a site', () => {
    const modified = Object.assign({}, sites[0]);
    const result = fromSites.reducer({ sites: sites }, new SiteActions.ModifySite(modified)).sites;
    expect(result[0]).toBe(modified);
  });
});
