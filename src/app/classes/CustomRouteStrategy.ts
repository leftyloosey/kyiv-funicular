import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  DetachedRouteHandle,
} from '@angular/router';

export class CustomRouteStrategy extends BaseRouteReuseStrategy {
  /**
   * Whether the given route should detach for later reuse.
   * Always returns false for `BaseRouteReuseStrategy`.
   * */

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /**
   * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
   */
  override store(
    route: ActivatedRouteSnapshot,
    detachedTree: DetachedRouteHandle
  ): void {}

  /** Returns `false`, meaning the route (and its subtree) is never reattached */
  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /** Returns `null` because this strategy does not store routes for later re-use. */
  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  /**
   * Determines if a route should be reused.
   * This strategy returns `true` when the future route config and current route config are
   * identical.
   */
  override shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    // return future.routeConfig === curr.routeConfig;

    return false;
  }
}
