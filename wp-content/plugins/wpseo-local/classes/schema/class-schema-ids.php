<?php
/**
 * @package WPSEO_Local\Frontend\Schema
 */

/**
 * Class WPSEO_Local_Schema_IDs.
 *
 * Defines all `@id` hashes we need throughout Local SEO's Schema.
 *
 * @property WPSEO_Schema_Context $context A value object with context variables.
 * @property array                $options Local SEO options.
 */
class WPSEO_Local_Schema_IDs {

	/**
	 * @var string
	 */
	const PLACE_ID = '#local-place';

	/**
	 * @var string
	 */
	const MAIN_ADDRESS_ID = '#local-main-place-address';

	/**
	 * @var string
	 */
	const BRANCH_ADDRESS_ID = '#local-branch-place-address';

	/**
	 * @var string
	 */
	const BRANCH_ORGANIZATION_ID = '#local-branch-organization';

	/**
	 * @var string
	 */
	const MAIN_ORGANIZATION_LOGO = '#local-main-organization-logo';

	/**
	 * @var string
	 */
	const BRANCH_ORGANIZATION_LOGO = '#local-branch-organization-logo';

	/**
	 * @var string
	 */
	const LIST_ID = '#list';
}
