import React from 'react';
import cn from 'classnames';
import styles from './index.css';

export default ({ className }) => {
  const wrapperStyles = cn(className, styles.wrapper);
  return (
    <div className={wrapperStyles}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis odio mi, feugiat in eros eget, congue accumsan nisl. Nulla dolor nibh, hendrerit non blandit eget, imperdiet sed est. Quisque dapibus maximus mi nec maximus. Aliquam tristique volutpat nisl, vel posuere elit ultrices vel. Fusce eu vestibulum lorem, ut lobortis tellus. Vivamus gravida ante id lorem dapibus, vitae rhoncus neque suscipit. Maecenas vehicula accumsan fermentum. Quisque tristique libero non ligula porta, eu pulvinar lorem scelerisque. Vivamus in lorem non felis dignissim ultricies.</p>    
      <p>Sed at ultrices nunc. Proin ornare sem eget odio laoreet scelerisque. Etiam eget auctor nibh, vitae porttitor ex. Ut bibendum, ante a tincidunt blandit, enim metus consequat tortor, feugiat egestas nulla magna a augue. Curabitur tristique ex risus, id aliquet nisi tincidunt nec. Pellentesque mollis orci mi, sit amet accumsan justo blandit vel. Sed eget eros dictum, lobortis nunc condimentum, elementum elit.</p>
      <p>Quisque ac dui et velit scelerisque iaculis at vel odio. Cras hendrerit aliquam neque, quis aliquet risus lobortis non. Fusce nisi ex, commodo sit amet velit ut, rhoncus iaculis neque. Morbi vitae consectetur mi. Aliquam maximus dignissim aliquam. Maecenas sagittis dictum metus. Nam ac arcu at nulla aliquet maximus. Donec vulputate sollicitudin dolor et venenatis. Aliquam eget tortor quis neque auctor condimentum. Sed mattis eros eget ullamcorper condimentum. Duis non est tempor, hendrerit ante luctus, hendrerit velit. Etiam lacus mauris, pulvinar eu consequat eu, cursus eu sapien. Integer commodo felis erat, ac laoreet nibh varius vel.</p>    
    </div>
  );
};
