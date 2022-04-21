import React from 'react';

import { Modal } from '../../components/library';
import useDisclosure from '../../components/hooks/useDisclosure';
import { SelectShapeForm } from '../../components/pages/game/forms';

export default {
  title: 'Cards/Modal',
  component: Modal,
  argTypes: {
    onHide: { action: 'clicked' },
  },
};

const Template = (args) => {
  const { shown } = useDisclosure();

  return <Modal shown={shown} {...args} />;
};

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  shown: false,
  title: 'Title',
  children:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem et, obcaecati temporibus amet ipsum laudantium at quo fuga ipsam atque doloribus debitis in! Est cupiditate unde dolore numquam aut at.',
};

export const ChooseShapeModal = Template.bind({});
ChooseShapeModal.args = {
  shown: false,
  title: 'Choose shape',
  children: <SelectShapeForm onSelectShape={(shape) => console.log(shape)} />,
};
