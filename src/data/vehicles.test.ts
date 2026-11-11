import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HERO_SLIDES,
  TRUST_BADGES,
  DEAL_SECTIONS_ORDER,
  getNextSlideIndex,
  getPrevSlideIndex,
  getVehiclesBySection,
  formatCurrency,
  toggleWishlistId,
  validateReservationForm,
} from './vehicles';

test('DEAL_SECTIONS_ORDER follows 1. Latest Deals, 2. Top Deals, 3. Cheap Deals', () => {
  assert.deepEqual(DEAL_SECTIONS_ORDER, [
    'latest-deals',
    'top-deals',
    'cheap-deals',
  ]);
});

test('HERO_SLIDES contains the 3 required mock slides', () => {
  assert.equal(HERO_SLIDES.length, 3);
  assert.deepEqual(
    HERO_SLIDES.map((s) => s.title),
    ['Special Offers', 'Latest Car Arrivals', 'General Promos']
  );
  for (const slide of HERO_SLIDES) {
    assert.equal(slide.ctaLabel, 'Shop Now');
  }
});

test('getNextSlideIndex and getPrevSlideIndex cycle properly', () => {
  assert.equal(getNextSlideIndex(0, 3), 1);
  assert.equal(getNextSlideIndex(1, 3), 2);
  assert.equal(getNextSlideIndex(2, 3), 0);

  assert.equal(getPrevSlideIndex(0, 3), 2);
  assert.equal(getPrevSlideIndex(2, 3), 1);
});

test('each deal section returns exactly 4 vehicles', () => {
  const latestDeals = getVehiclesBySection('latest-deals');
  const topDeals = getVehiclesBySection('top-deals');
  const cheapDeals = getVehiclesBySection('cheap-deals');

  assert.equal(latestDeals.length, 4);
  assert.equal(topDeals.length, 4);
  assert.equal(cheapDeals.length, 4);
});

test('TRUST_BADGES contains the 3 required guarantees', () => {
  assert.equal(TRUST_BADGES.length, 3);
  assert.deepEqual(
    TRUST_BADGES.map((b) => b.title),
    ['Verified Vehicles', 'Secure Payments', '24/7 Support']
  );
});

test('formatCurrency formats numbers cleanly as USD', () => {
  assert.equal(formatCurrency(168900), '$168,900');
  assert.equal(formatCurrency(21900), '$21,900');
});

test('toggleWishlistId adds and removes vehicle IDs deterministically', () => {
  const list1 = toggleWishlistId([], 'top-1');
  assert.deepEqual(list1, ['top-1']);

  const list2 = toggleWishlistId(list1, 'cheap-2');
  assert.deepEqual(list2, ['top-1', 'cheap-2']);

  const list3 = toggleWishlistId(list2, 'top-1');
  assert.deepEqual(list3, ['cheap-2']);
});

test('validateReservationForm enforces required fields and valid formats', () => {
  assert.equal(
    validateReservationForm({ fullName: '', email: 'a@b.com', phone: '5551234567' }).valid,
    false
  );
  assert.equal(
    validateReservationForm({ fullName: 'Alex Mercer', email: 'invalid-email', phone: '5551234567' }).valid,
    false
  );
  assert.equal(
    validateReservationForm({ fullName: 'Alex Mercer', email: 'alex@monolith.auto', phone: '123' }).valid,
    false
  );
  assert.equal(
    validateReservationForm({ fullName: 'Alex Mercer', email: 'alex@monolith.auto', phone: '555-839-2001' }).valid,
    true
  );
});
