import * as React from 'react';

export interface UniversalInputProps {
  [key: string]: any;

  /** An element type to render as (string or function). */
  as?: any;

  /** The value of the input. */
  defaultValue?: number | string;

  /**
   * Called on change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onChange?: (event: React.FormEvent<HTMLTextAreaElement>, data: UniversalInputProps) => void;

  /** The value of the input. */
  value?: number | string;
}

declare const UniversalInput: React.ComponentClass<UniversalInputProps>;

export default UniversalInput;
